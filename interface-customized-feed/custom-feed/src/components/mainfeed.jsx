import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AvatarImage, Avatar } from "./ui/avatar";
import { HeartIcon } from "./icons/HeartIcon";
import { MessageCircleIcon } from "./icons/MessageCircleIcon";
import { RepeatIcon } from "./icons/RepeatIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UploadIcon } from "./icons/UploadIcon";
import { fetchTweets } from "../services/api";
import React from "react";
import Modal from "./modal";
import axios from "axios";

export default function MainFeed() {
  return (
    <div className="flex flex-col flex-1 px-4 py-2 overflow-y-scroll  ">
      <FeedHeader />
      <CreatePostForm />
      <PostList />
    </div>
  );
}

export function FeedHeader() {
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
      <Modal isOpen={isModalOpen} close={toggleModal} />
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

  console.log(username);

  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-lg mt-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage alt="User avatar" src={avatarSrc} />
        </Avatar>
        <div>
          <div className="font-bold">{username}</div>
          <div className="text-sm text-gray-400">
            @{handle} · {time}
          </div>
        </div>
      </div>
      <p className="mt-2">{content}</p>
      {mediaSrc && (
        <div className="mt-2">
          <img
            alt="Post media"
            className="rounded-lg"
            height="200"
            src={mediaSrc}
            style={{
              aspectRatio: "355/200",
              objectFit: "cover",
            }}
            width="auto"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-2 text-gray-400">
        <div className="flex items-center space-x-1">
          <MessageCircleIcon className="h-5 w-5" />
          <span>{messageCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <RepeatIcon className="h-5 w-5" />
          <span>{retweetCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <HeartIcon className="h-5 w-5" />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <UploadIcon className="h-5 w-5" />
          <span>{shareCount}</span>
        </div>
      </div>
    </div>
  );
}

function PostList() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/static/tech-list.json"); // Replace '/api/posts' with your API endpoint
    //     // setPosts(response.data);
    //     response.json().then((val) => {
    //       console.log(val);
    //       setPosts(val);
    //     });
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    const res = fetchTweets();
    res.then((val) => {
      const tweetsList = val.data;
      const assetsList = val.includes?.media;
      const usersList = val.includes?.users;

      console.log(tweetsList);
      console.log(assetsList);
      console.log(usersList);

      let newTweets = [];

      // generate list of tweet objs
      tweetsList.forEach((tweet) => {
        // get user from list
        const user = usersList.find((user) => user.id === tweet.author_id);
        const mediaKeys = tweet?.attachments?.media_keys;

        let mediaLink = "";
        if (mediaKeys) {
          // fetch media
          const key = mediaKeys[0];
          const src = assetsList.find((asset) => asset.media_key === key);
          mediaLink = src?.preview_image_url ?? src?.url ?? "";
        }

        newTweets.push({
          avatarSrc: user.profile_image_url,
          username: user.name,
          handle: user.username,
          time: "4:40 AM",
          content: tweet.text,
          mediaSrc: mediaLink,
          messageCount: 123,
          retweetCount: 248,
          likeCount: 143,
          shareCount: 22,
        });
      });

      setPosts(newTweets);
    });
  }, []);

  return (
    <div>
      {/* <div className="mt-4 text-sm text-gray-400">Show 28 posts</div> */}

      {/* list of posts */}
      {posts &&
        posts.map((post) => {
          console.log(post);
          return <Post post={post} />;
        })}
    </div>
  );
}
