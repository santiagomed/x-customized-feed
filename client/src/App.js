// import logo from './logo.svg';
import './App.css';

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { AvatarImage, Avatar } from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { BellIcon } from "./components/icons/BellIcon"
import { BookmarkIcon } from "./components/icons/BookmarkIcon"
import { HomeIcon } from "./components/icons/HomeIcon"
import { ListIcon } from "./components/icons/ListIcon"
import { MailboxIcon } from "./components/icons/MailboxIcon"
import { MoreHorizontalIcon } from "./components/icons/MoreHorizontalIcon"
import { SearchIcon } from "./components/icons/SearchIcon"
import { TwitterIcon } from "./components/icons/TwitterIcon"
import { UserIcon } from "./components/icons/UserIcon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import React from "react";
import MainFeed from "./components/mainfeed"


function App() {
  const [selectedDataSource, setSelectedDataSource] = React.useState('');

  const handleDataSourceChange = (value) => {
    setSelectedDataSource(value);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="App-two flex h-screen bg-[#15202b] text-white overflow-y-hidden text-left">
      {/* <div className="flex flex-nowrap overflow-x-hidden h-screen bg-[#15202b] text-white"> */}

      <div className="flex flex-col w-64 px-4 py-2 border-r border-gray-800">
        <div className="flex items-center space-x-2">
          {/* <span className="font-bold text-xl">Not</span> */}
          <TwitterIcon className="h-5 w-6" />
          <span className="font-bold text-xl">(ish)</span>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <HomeIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Home</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <SearchIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Explore</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <BellIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Notifications</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <MailboxIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Messages</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <BookmarkIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Bookmarks</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <ListIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Lists</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <UserIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Profile</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="/">
                <MoreHorizontalIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">More</span>
              </a>
            </li>
          </ul>
        </nav>
        <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Post</Button>
        <Select onValueChange={handleDataSourceChange} className="mt-8">
          <SelectTrigger className="w-[180px] mt-8 border border-zinc-500">
            <SelectValue placeholder="Data source" />
          </SelectTrigger>
          <SelectContent className="border-zinc-500 text-white">
            <SelectItem key="live" value="live">Live</SelectItem>
            <SelectItem key="censored" value="censored">Censored</SelectItem>
            <SelectItem key="violent" value="violent">Violent</SelectItem>
            <SelectItem key="normal" value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <MainFeed dataSource={selectedDataSource} className="main-feed " />
      
      <div className="w-80 px-4 py-2 border-l border-gray-800">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-6 w-6" />
          <Input className="flex-1 px-4 py-2 bg-gray-800 rounded-full" placeholder="Search" />
        </div>
        <div className="mt-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">Subscribe to Premium</h2>
            <p className="mt-2 text-sm text-gray-400">
              Subscribe to unlock new features and if eligible, receive a share of ads revenue.
            </p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Subscribe</Button>
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">What’s happening</h2>
            <div className="mt-2">
              <Badge variant="secondary">Beta</Badge>
              <div className="mt-2">
                <h3 className="font-bold">Magic at Cavaliers</h3>
                <p className="text-sm text-gray-400">NBA - LIVE</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Trending</h3>
                <p className="text-sm text-gray-400">Nvidia</p>
                <p className="text-sm text-gray-400">23.2K posts</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Technology - Trending</h3>
                <p className="text-sm text-gray-400">GPT-5</p>
                <p className="text-sm text-gray-400">1,461 posts</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Sports - Trending</h3>
                <p className="text-sm text-gray-400">#WOLARS</p>
                <p className="text-sm text-gray-400">Trending with Wolves, Knicks</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Music - Trending</h3>
                <p className="text-sm text-gray-400">Drakes</p>
                <p className="text-sm text-gray-400">6,116 posts</p>
              </div>
              <Button className="mt-4 text-blue-500 hover:text-blue-600">Show more</Button>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">Who to follow</h2>
            <div className="flex items-center mt-4">
              <Avatar>
                <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
              </Avatar>
              <div className="ml-2">
                <h3 className="font-bold">User Name</h3>
                <p className="text-sm text-gray-400">@username</p>
              </div>
              <Button className="ml-auto bg-blue-500 hover:bg-blue-600">Follow</Button>
            </div>
            <Button className="mt-4 text-blue-500 hover:text-blue-600">Show more</Button>
          </div>
        </div>
      </div>
    </div>
      </header>
    </div>
  );
}

export default App;


/*

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex h-screen bg-[#15202b] text-white">
      <div className="flex flex-col w-64 px-4 py-2 border-r border-gray-800">
        <div className="flex items-center space-x-2">
          <TwitterIcon className="h-8 w-8" />
          <span className="font-bold text-xl">Home</span>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <HomeIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Home</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <TwitterIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Explore</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <BellIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Notifications</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <MailboxIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Messages</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <BookmarkIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Bookmarks</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <ListIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Lists</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <UserIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Profile</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 group" href="#">
                <MoreHorizontalIcon className="h-6 w-6 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">More</span>
              </a>
            </li>
          </ul>
        </nav>
        <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Post</Button>
      </div>
      <div className="flex flex-col flex-1 px-4 py-2 overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">For you</h1>
          <SettingsIcon className="h-6 w-6" />
        </div>
        <div className="mt-4 flex space-x-4">
          <Input className="flex-1 px-4 py-2 rounded-full bg-gray-800" placeholder="What is happening?!" />
          <Button className="bg-blue-500 hover:bg-blue-600">Post</Button>
        </div>
        <div className="mt-4 text-sm text-gray-400">Show 28 posts</div>
        <div className="mt-4 flex flex-col space-y-4 overflow-y-auto">
          <div className="flex flex-col p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
              </Avatar>
              <div>
                <div className="font-bold">Amjad Masad</div>
                <div className="text-sm text-gray-400">@amasad · 13h</div>
              </div>
            </div>
            <p className="mt-2">
              I appreciate how @DavidSacks frequently has a novel take on things. You can tell this mind is unshackled
              from the default "reasoning by tribe" and can generate more dispassionate thoughts.
            </p>
            <p className="mt-2 text-blue-500">
              Listen to his take on the controversial Gaza protestors in the latest All In:
            </p>
            <div className="mt-2">
              <img
                alt="Post media"
                className="rounded-lg"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "355/200",
                  objectFit: "cover",
                }}
                width="355"
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-gray-400">
              <div className="flex items-center space-x-1">
                <MessageCircleIcon className="h-5 w-5" />
                <span>123</span>
              </div>
              <div className="flex items-center space-x-1">
                <RepeatIcon className="h-5 w-5" />
                <span>248</span>
              </div>
              <div className="flex items-center space-x-1">
                <HeartIcon className="h-5 w-5" />
                <span>1.5K</span>
              </div>
              <div className="flex items-center space-x-1">
                <UploadIcon className="h-5 w-5" />
                <span>223K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 px-4 py-2 border-l border-gray-800">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-6 w-6" />
          <Input className="flex-1 px-4 py-2 bg-gray-800 rounded-full" placeholder="Search" />
        </div>
        <div className="mt-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">Subscribe to Premium</h2>
            <p className="mt-2 text-sm text-gray-400">
              Subscribe to unlock new features and if eligible, receive a share of ads revenue.
            </p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Subscribe</Button>
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">What’s happening</h2>
            <div className="mt-2">
              <Badge variant="secondary">Beta</Badge>
              <div className="mt-2">
                <h3 className="font-bold">Magic at Cavaliers</h3>
                <p className="text-sm text-gray-400">NBA - LIVE</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Trending</h3>
                <p className="text-sm text-gray-400">Nvidia</p>
                <p className="text-sm text-gray-400">23.2K posts</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Technology - Trending</h3>
                <p className="text-sm text-gray-400">GPT-5</p>
                <p className="text-sm text-gray-400">1,461 posts</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Sports - Trending</h3>
                <p className="text-sm text-gray-400">#WOLARS</p>
                <p className="text-sm text-gray-400">Trending with Wolves, Knicks</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Music - Trending</h3>
                <p className="text-sm text-gray-400">Drakes</p>
                <p className="text-sm text-gray-400">6,116 posts</p>
              </div>
              <Button className="mt-4 text-blue-500 hover:text-blue-600">Show more</Button>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="font-bold">Who to follow</h2>
            <div className="flex items-center mt-4">
              <Avatar>
                <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
              </Avatar>
              <div className="ml-2">
                <h3 className="font-bold">User Name</h3>
                <p className="text-sm text-gray-400">@username</p>
              </div>
              <Button className="ml-auto bg-blue-500 hover:bg-blue-600">Follow</Button>
            </div>
            <Button className="mt-4 text-blue-500 hover:text-blue-600">Show more</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}


function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function ListIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function MailboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  )
}


function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}


function RepeatIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

*/
