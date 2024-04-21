// import { Button } from "./ui/button";
// import {
//   HomeIcon,
//   TwitterIcon,
//   BellIcon,
//   MailboxIcon,
//   BookmarkIcon,
//   ListIcon,
//   UserIcon,
//   MoreHorizontalIcon,
// } from "./icons";

// export default function Sidebar() {
//   return (
//     <div className="flex flex-col w-64 px-4 py-2 border-r border-gray-800">
//       <div className="flex items-center space-x-2">
//         <TwitterIcon className="h-8 w-8" />
//         <span className="font-bold text-xl">Home</span>
//       </div>
//       <nav className="mt-4">
//         <ul className="space-y-2">
//           <NavItem icon={HomeIcon} label="Home" />
//           <NavItem icon={BellIcon} label="Notifications" />
//           <NavItem icon={MailboxIcon} label="Messages" />
//           <NavItem icon={BookmarkIcon} label="Bookmarks" />
//           <NavItem icon={ListIcon} label="Lists" />
//           <NavItem icon={UserIcon} label="Profile" />
//           <NavItem icon={MoreHorizontalIcon} label="More" />
//         </ul>
//       </nav>
//       <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Post</Button>
//     </div>
//   );
// }

// function NavItem({ icon: Icon, label }) {
//   return (
//     <li>
//       <a className="flex items-center space-x-2 group" href="#">
//         <Icon className="h-6 w-6 group-hover:text-blue-500" />
//         <span className="group-hover:text-blue-500">{label}</span>
//       </a>
//     </li>
//   );
// }
