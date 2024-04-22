import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AvatarImage, Avatar } from "./ui/avatar";
import { HeartIcon } from "./icons/HeartIcon";
import { MessageCircleIcon } from "./icons/MessageCircleIcon";
import { RepeatIcon } from "./icons/RepeatIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UploadIcon } from "./icons/UploadIcon";
import { fetchTweets, fetchStaticTweets } from "../services/api";
import React from "react";
import Modal from "./modal";

export default function MainFeed({ dataSource }) {
  const [tweetIDs, setTweetIDs] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  const handleTweetIDsReceived = (ids) => {
    console.log("handleTweetIDsReceived:", ids);
    setTweetIDs(ids);
  };

  React.useEffect(() => {
    if (tweetIDs && tweetIDs.length > 0) {
      const updatedPosts = tweetIDs.map((id) =>
        posts.find((post) => post.id === id)
      );
      setPosts(updatedPosts);
    }
  }, [tweetIDs]); // eslint-disable-line

  React.useEffect(() => {
    console.log(dataSource);
    if (dataSource === "live") {
      const res = fetchTweets();
      res.then((val) => {
        const tweetsList = val.data;
        const assetsList = val.includes?.media;
        const usersList = val.includes?.users;

        // console.log(tweetsList);
        // console.log(assetsList);
        // console.log(usersList);

        let newTweets = [];

        tweetsList?.forEach((tweet) => {
          const user = usersList.find((user) => user.id === tweet.author_id);
          const mediaKeys = tweet?.attachments?.media_keys;
          const time = new Date(tweet.created_at);
          const hours = time.getHours();
          const minutes = time.getMinutes();

          const { bookmark_count, like_count, reply_count, retweet_count } =
            tweet.public_metrics;

          let mediaLink = "";
          if (mediaKeys) {
            const key = mediaKeys[0];
            const src = assetsList.find((asset) => asset.media_key === key);
            mediaLink = src?.preview_image_url ?? src?.url ?? "";
          }

          newTweets.push({
            id: tweet.id,
            avatarSrc: user.profile_image_url,
            username: user.name,
            handle: user.username,
            time: `${hours}:${minutes}`,
            content: tweet.text,
            mediaSrc: mediaLink,
            messageCount: reply_count,
            retweetCount: retweet_count,
            likeCount: like_count,
            shareCount: bookmark_count,
          });
        });

        console.log("newTweets", newTweets);
        setPosts(newTweets);
      });
    } else if (dataSource) {
      const res = fetchStaticTweets(dataSource);
      res.then((val) => {
        console.log(val);
        setPosts(val);
      });
    }
  }, [dataSource]);

  return (
    <div className="flex flex-col flex-1 px-4 py-2 overflow-y-scroll  ">
      <FeedHeader onIDsReceived={handleTweetIDsReceived} posts={posts} />
      <CreatePostForm />
      <PostList posts={posts} />
    </div>
  );
}

export function FeedHeader({ onIDsReceived, posts }) {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">For you</h1>
      <SettingsIcon
        className="h-6 w-6"
        onClick={toggleModal}
        style={{ cursor: "pointer" }}
      />
      <Modal
        isOpen={isModalOpen}
        close={toggleModal}
        onIDsReceived={onIDsReceived}
        posts={posts}
      />
    </div>
  );
}

function CreatePostForm() {
  return (
    <div className="mt-4 flex space-x-4">
      <Input
        className="flex-1 px-4 py-2 rounded-full bg-gray-800"
        placeholder="What is happening?!"
      />
      <Button className="bg-blue-500 hover:bg-blue-600">Post</Button>
    </div>
  );
}

function Post({ post }) {
  const {
    avatarSrc,
    username,
    handle,
    time,
    content,
    mediaSrc,
    messageCount,
    retweetCount,
    likeCount,
    shareCount,
  } = post;

  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-lg mt-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage alt="User avatar" src={avatarSrc} />
        </Avatar>
        <div>
          <div className="font-bold text-base">{username}</div>
          <div className="text-sm text-gray-400">
            {handle} · {time}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm mb-10">{content}</p>
      {mediaSrc && (
        <div className="mt-2 ">
          <img
            alt="Post media"
            className={
              post?.censor ? "rounded-lg filter blur-md" : "rounded-lg"
            }
            height="200"
            src={mediaSrc}
            style={{
              aspectRatio: "355/200",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-10 text-gray-400 text-xs space-x-2 px-4">
        <div className="flex items-center space-x-1">
          <MessageCircleIcon className="h-4 w-4" />
          <span>{messageCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <RepeatIcon className="h-4 w-4" />
          <span>{retweetCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <HeartIcon className="h-4 w-4" />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <UploadIcon className="h-4 w-4" />
          <span>{shareCount}</span>
        </div>
      </div>
    </div>
  );
}

function PostList({ posts }) {
  return (
    <div>
      {/* <div className="mt-4 text-sm text-gray-400">Show 28 posts</div> */}

      {/* list of posts */}
      {posts &&
        posts.map((post) => {
          // console.log(post);
          return <Post post={post} />;
        })}
    </div>
  );
}
