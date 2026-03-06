// import { Avatar, Button, Spinner } from '@heroui/react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useState } from 'react';
// import { TickCircle } from 'iconsax-reactjs';

// const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

// // ====== APIs ======
// function getNotifications(unread) {
//     return axios.get(
//         `https://route-posts.routemisr.com/notifications?unread=${unread}&page=1&limit=10`,
//         { headers: getHeaders() }
//     );
// }

// function getUnreadCount() {
//     return axios.get(
//         'https://route-posts.routemisr.com/notifications/unread-count',
//         { headers: getHeaders() }
//     );
// }

// function markOneAsRead(notifId) {
//     return axios.patch(
//         `https://route-posts.routemisr.com/notifications/${notifId}/read`,
//         {},
//         { headers: getHeaders() }
//     );
// }

// function markAllAsRead() {
//     return axios.patch(
//         'https://route-posts.routemisr.com/notifications/read-all',
//         {},
//         { headers: getHeaders() }
//     );
// }

// // ====== تحويل الوقت ======
// function timeAgo(date) {
//     const diff = Math.floor((Date.now() - new Date(date)) / 1000);
//     if (diff < 60) return `${diff}s`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}m`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
//     return `${Math.floor(diff / 86400)}d`;
// }

// // ====== كارت الـ Notification الواحدة ======
// function NotificationItem({ notif }) {
//    console.log(notif);
//     const queryClient = useQueryClient();

//     const isLike = notif?.type === 'like';
//     const isComment = notif?.type === 'comment';

//     const { mutate: markRead, isPending } = useMutation({
//         mutationFn: () => markOneAsRead(notif._id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['notifications'] });
//             queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
//         }
//     });

//     return (
//         <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all
//             ${!notif.isRead ? 'bg-blue-50/40 border-blue-100' : 'bg-white border-gray-100'}`}>

//             {/* صورة اليوزر */}
//             <div className="relative shrink-0">
//                 <Avatar
//                     src={notif?.actor?.photo}
//                     size="md"
//                     isBordered
//                     color={isLike ? 'danger' : isComment ? 'primary' : 'default'}
//                 />
//                 <span className="absolute -bottom-1 -right-1 text-sm">
//                     {isLike ? '❤️' : isComment ? '💬' : '👤'}
//                 </span>
//             </div>

//             {/* المحتوى */}
//             <div className="flex-1 min-w-0">

// <span className="text-gray-500">
//     {notif?.type?.replace(/_/g, ' ')}
// </span>

// {/* يظهر محتوى الـ post/comment تحت */}
// {notif?.entity?.body && (
//     <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
//         "{notif.entity.body}"
//     </p>
// )}

//                 <div className="flex items-center gap-3 mt-2">
//                     {!notif.isRead ? (
//                         <button
//                             onClick={() => markRead()}
//                             disabled={isPending}
//                             className="flex items-center gap-1 text-xs text-teal-600 font-medium hover:text-teal-700 transition-colors"
//                         >
//                             <TickCircle size={14} />
//                             {isPending ? 'Marking...' : 'Mark as read'}
//                         </button>
//                     ) : (
//                         <span className="flex items-center gap-1 text-xs text-teal-500 font-medium">
//                             <TickCircle size={14} />
//                             Read
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* الوقت */}
//             <span className="text-xs text-gray-400 shrink-0">{timeAgo(notif?.createdAt)}</span>
//         </div>
//     );
// }


// // ====== الـ Page الرئيسية ======
// export default function Notifications() {
//     const [showUnread, setShowUnread] = useState(false);
//     const queryClient = useQueryClient();

//     const { data: notifications, isLoading } = useQuery({
//         queryKey: ['notifications', showUnread],
//         queryFn: () => getNotifications(showUnread),
//         select: (data) => data.data.data.notifications,
//         refetchInterval: 30000,
//     });

//     const { data: unreadCount } = useQuery({
//         queryKey: ['unreadCount'],
//         queryFn: getUnreadCount,
//         select: (data) => data.data.data.count,
//         refetchInterval: 30000,
//     });

//     const { mutate: markAll, isPending: isMarkingAll } = useMutation({
//         mutationFn: markAllAsRead,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['notifications'] });
//             queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
//         }
//     });

//     return (
//         <div className="max-w-3xl mx-auto mt-8 px-4">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

//                 {/* Header */}
//                 <div className="flex items-start justify-between p-6 border-b border-gray-100">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//                         <p className="text-sm text-gray-400 mt-1">
//                             Realtime updates for likes, comments, shares, and follows.
//                         </p>
//                     </div>
//                     {unreadCount > 0 && (
//                         <Button
//                             size="sm"
//                             variant="bordered"
//                             radius="full"
//                             isLoading={isMarkingAll}
//                             onClick={() => markAll()}
//                             startContent={!isMarkingAll && <TickCircle size={16} />}
//                             className="text-gray-500 border-gray-200 shrink-0"
//                         >
//                             Mark all as read
//                         </Button>
//                     )}
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-2 px-6 py-3 border-b border-gray-100">
//                     <button
//                         onClick={() => setShowUnread(false)}
//                         className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
//                             ${!showUnread ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
//                     >
//                         All
//                     </button>
//                     <button
//                         onClick={() => setShowUnread(true)}
//                         className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
//                             ${showUnread ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
//                     >
//                         Unread {unreadCount > 0 && `(${unreadCount})`}
//                     </button>
//                 </div>

//                 {/* المحتوى */}
//                 <div className="p-4 flex flex-col gap-3">
//                     {isLoading && (
//                         <div className="flex justify-center py-10">
//                             <Spinner color="primary" />
//                         </div>
//                     )}

//                     {!isLoading && notifications?.length === 0 && (
//                         <div className="text-center py-12">
//                             <p className="text-4xl mb-3">🔔</p>
//                             <p className="text-gray-400 font-medium">No notifications yet</p>
//                         </div>
//                     )}

//                     {!isLoading && notifications?.map((notif) => (
//                         <NotificationItem key={notif._id} notif={notif} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Avatar, Button, Spinner } from '@heroui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';


const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });


function getAllNotifications() {

    return axios.get(
        `https://route-posts.routemisr.com/notifications?limit=20`, 
        { headers: getHeaders() }
    );
}

function markOneAsRead(notifId) {
    return axios.patch(
        `https://route-posts.routemisr.com/notifications/${notifId}/read`,
        {},
        { headers: getHeaders() }
    );
}


function NotificationItem({ notif }) {
    const queryClient = useQueryClient();

    const { mutate: markRead, isPending } = useMutation({
        mutationFn: () => markOneAsRead(notif._id),
        onSuccess: () => {
          
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all
            ${!notif.isRead ? 'bg-blue-50/40 border-blue-100' : 'bg-white border-gray-100'}`}>

            {/* Avatar */}
            <div className="shrink-0">
                <Avatar
                    src={notif?.actor?.photo}
                    size="md"
                    className="w-12 h-12"
                    isBordered={!notif.isRead}
                    color={!notif.isRead ? "primary" : "default"}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">
                        {notif?.actor?.name || "Someone"}
                    </span>
                    <span className="text-gray-600 text-sm">
                        {notif?.type === 'like' ? 'liked your post' : 
                         notif?.type === 'comment' ? 'commented on your post' : 
                         notif?.type?.replace(/_/g, ' ')}
                    </span>
                </div>
                
                {notif?.entity?.body && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate italic">
                        "{notif.entity.body}"
                    </p>
                )}
            </div>

            {/* الزرار يظهر فقط لو مش مقروء */}
            {!notif.isRead && (
                <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    className="h-8 px-2 text-xs font-semibold"
                    isLoading={isPending}
                    onClick={() => markRead()}
                >
                    {isPending ? '...' : 'Mark read'}
                </Button>
            )}
        </div>
    );
}

export default function Notifications() {
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const queryClient = useQueryClient();

    const { data: allNotifications, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: getAllNotifications,
        select: (data) => data.data.data.notifications,
    });

    // لو اليوزر داس على تبويب Unread بنفلتر الداتا اللي جات لنا أصلاً
    const displayedNotifications = showUnreadOnly 
        ? allNotifications?.filter(n => n.isRead === false)
        : allNotifications;

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-gray-50">
                    <h1 className="text-xl font-extrabold text-gray-900">Notifications</h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 px-6 py-2 bg-gray-50/50">
                    <button
                        onClick={() => setShowUnreadOnly(false)}
                        className={`text-sm py-2 px-1 border-b-2 transition-all font-medium
                            ${!showUnreadOnly ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setShowUnreadOnly(true)}
                        className={`text-sm py-2 px-1 border-b-2 transition-all font-medium
                            ${showUnreadOnly ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        Unread
                    </button>
                </div>

                {/* List */}
                <div className="p-4 flex flex-col gap-2">
                    {isLoading ? (
                        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
                    ) : (
                        displayedNotifications?.map((notif) => (
                            <NotificationItem key={notif._id} notif={notif} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}