const http = require("http");
const request = require("request");
const Promise = require("promise");

class Instagram {
  constructor() {
    this.httpUri = "https://instagram.com/";
  }

  getUserProfile(username) {
    const uri = `${this.httpUri}${username}/?__a=1`;
    return new Promise((resolve, reject) => {
      request(
        {
          uri: uri,
          method: "GET",
        },
        (error, response, body) => {
          if (response.statusCode !== 200) reject(error);

          const result = JSON.parse(body);
          const { user } = result.graphql;
          let resultBuilder = {
            instagram_id: user.id,
            is_private: user.is_private,
            full_name: user.full_name,
            username: user.username,
            bio: user.biography,
            website: user.external_url,
            followers: user.edge_followed_by.count,
            following: user.edge_follow.count,
            profile_pic: user.profile_pic_url_hd,
            total_posts: user.edge_owner_to_timeline_media.count,
            posts: [],
          };

          user.edge_owner_to_timeline_media.edges.map((post) => {
            let postBuilder = {
              id_post: post.node.shortcode,
              is_video: post.node.is_video,
              likes: post.node.edge_liked_by.count,
              total_comments: post.node.edge_media_to_comment.count,
              location: post.node.location,
              caption:
                post.node.edge_media_to_caption.edges.length !== 0
                  ? post.node.edge_media_to_caption.edges[0].node.text
                  : "",
              media: post.node.display_url,
              tagged_user: [],
            };

            post.node.edge_media_to_tagged_user.edges.map((user) => {
              postBuilder.tagged_user.push(user.node.user);
            });

            resultBuilder.posts.push(postBuilder);
          });

          resolve(resultBuilder);
        }
      );
    });
  }

  getPostByHashtag(hashtag_param) {
    const uri = `${this.httpUri}explore/tags/${hashtag_param}/?__a=1`;
    return new Promise((resolve, reject) => {
      request(
        {
          uri: uri,
          method: "GET",
        },
        (error, response, body) => {
          if (response.statusCode !== 200) reject(error);
          const result = JSON.parse(body);
          const { hashtag } = result.graphql;
          let resultBuilder = {
            hashtag_id: hashtag.id,
            hashtag_name: hashtag.name,
            pic_url: hashtag.profile_pic_url,
            new_posts: [],
            top_posts: [],
          };

          hashtag.edge_hashtag_to_media.edges.map((new_post) => {
            let new_post_builder = {
              id_post: new_post.node.shortcode,
              is_video: new_post.node.is_video,
              likes: new_post.node.edge_liked_by.count,
              total_comments: new_post.node.edge_media_to_comment.count,
              caption:
                new_post.node.edge_media_to_caption.edges.length !== 0
                  ? new_post.node.edge_media_to_caption.edges[0].node.text
                  : "",
              media: new_post.node.display_url,
            };

            resultBuilder.new_posts.push(new_post_builder);
          });

          hashtag.edge_hashtag_to_top_posts.edges.map((top_post) => {
            let top_post_builder = {
              id_post: top_post.node.shortcode,
              is_video: top_post.node.is_video,
              likes: top_post.node.edge_liked_by.count,
              total_comments: top_post.node.edge_media_to_comment.count,
              caption:
                top_post.node.edge_media_to_caption.edges.length !== 0
                  ? top_post.node.edge_media_to_caption.edges[0].node.text
                  : "",
              media: top_post.node.display_url,
            };

            resultBuilder.top_posts.push(top_post_builder);
          });

          resolve(resultBuilder);
        }
      );
    });
  }

  getPostByLocation(location_id, slug) {
    const uri = `${this.httpUri}explore/locations/${location_id}/${slug}/?__a=1`;
    return new Promise((resolve, reject) => {
      request(
        {
          uri: uri,
          method: "GET",
        },
        (error, response, body) => {
          if (response.statusCode !== 200) reject(error);
          const result = JSON.parse(body);
          const { location } = result.graphql;
          let resultBuilder = {
            hashtag_id: location.id,
            location_name: location.name,
            pic_url: location.profile_pic_url,
            website: location.website,
            phone: location.phone,
            country: location.directory.name,
            new_posts: [],
            top_posts: [],
          };

          location.edge_location_to_media.edges.map((new_post) => {
            let new_post_builder = {
              id_post: new_post.node.shortcode,
              is_video: new_post.node.is_video,
              likes: new_post.node.edge_liked_by.count,
              total_comments: new_post.node.edge_media_to_comment.count,
              caption:
                new_post.node.edge_media_to_caption.edges.length !== 0
                  ? new_post.node.edge_media_to_caption.edges[0].node.text
                  : "",
              media: new_post.node.display_url,
            };

            resultBuilder.new_posts.push(new_post_builder);
          });

          location.edge_location_to_top_posts.edges.map((top_post) => {
            let top_post_builder = {
              id_post: top_post.node.shortcode,
              is_video: top_post.node.is_video,
              likes: top_post.node.edge_liked_by.count,
              total_comments: top_post.node.edge_media_to_comment.count,
              caption:
                top_post.node.edge_media_to_caption.edges.length !== 0
                  ? top_post.node.edge_media_to_caption.edges[0].node.text
                  : "",
              media: top_post.node.display_url,
            };

            resultBuilder.top_posts.push(top_post_builder);
          });

          resolve(resultBuilder);
        }
      );
    });
  }

  getDetailPost(id_post) {
    const uri = `${this.httpUri}p/${id_post}/?__a=1`;
    return new Promise((resolve, reject) => {
      request(
        {
          uri: uri,
          method: "GET",
        },
        (error, response, body) => {
          if (response.statusCode !== 200) reject(error);
          const result = JSON.parse(body);
          const { shortcode_media } = result.graphql;

          let resultBuilder = {
            media: shortcode_media.display_url,
            is_video: shortcode_media.is_video,
            caption:
              shortcode_media.edge_media_to_caption.edges.length !== 0
                ? shortcode_media.edge_media_to_caption.edges[0].node.text
                : "",
            likes: shortcode_media.edge_media_preview_like.count,
            total_comments: shortcode_media.edge_media_to_parent_comment.count,
            location: shortcode_media.location,
            tagged_user: [],
            comments: [],
            owner: {
              instagram_id: shortcode_media.owner.id,
              full_name: shortcode_media.owner.full_name,
              username: shortcode_media.owner.username,
              profile_pic: shortcode_media.owner.profile_pic_url,
            },
          };

          shortcode_media.edge_media_to_tagged_user.edges.map((user) => {
            resultBuilder.tagged_user.push(user.node.user);
          });

          shortcode_media.edge_media_to_parent_comment.edges.map((comment) => {
            let comment_builder = {
              comments_id: comment.node.id,
              comment_text: comment.node.text,
              owner: {
                instagram_id: comment.node.owner.id,
                username: comment.node.owner.username,
                profile_pic: comment.node.owner.profile_pic_url,
              },
              comment_likes: comment.node.edge_liked_by.count,
              sub_comments_total: comment.node.edge_threaded_comments.count,
              sub_comments: [],
            };

            comment.node.edge_threaded_comments.edges.map(
              (sub_comment) => {
                comment_builder.sub_comments.push({
                  sub_comments_id: sub_comment.node.id,
                  sub_comment_text: sub_comment.node.text,
                  owner: {
                    instagram_id: sub_comment.node.owner.id,
                    username: sub_comment.node.owner.username,
                    profile_pic: sub_comment.node.owner.profile_pic_url,
                  },
                  sub_comment_likes: sub_comment.node.edge_liked_by.count,
                });
              }
            );

            resultBuilder.comments.push(comment_builder);
          });

          resolve(resultBuilder);
        }
      );
    });
  }
}

module.exports = new Instagram();
