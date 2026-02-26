import { Avatar, Button, Input, Spinner } from '@heroui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { UserAdd } from 'iconsax-reactjs';

function getSuggestions() {
    return axios.get('https://route-posts.routemisr.com/users/suggestions?limit=5', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
}

function followUser(userId) {
    return axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
}

function UserCard({ user }) {
    const queryClient = useQueryClient();

    const { mutate: toggleFollow, isPending } = useMutation({
        mutationFn: followUser(user._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suggestions'] });
        }
    });

    return (
        <div className="flex flex-col gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Avatar src={user?.photo} size="md" isBordered color="primary" />      
                         <div>
                    <p className="text-sm font-semibold text-gray-800 capitalize truncate max-w-30">
                         {user?.name}
                           </p>
                        </div>
                </div>
                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    radius="full"
                    isLoading={isPending}
                    onClick={() => toggleFollow()}
                    startContent={!isPending && <UserAdd size={16} />}
                  
                >
                    Follow
                </Button>
            </div>
            <div className="flex gap-2 ps-1">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {user?.followersCount || 0} followers
                </span>
                {user?.mutualCount > 0 && (
                    <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">
                        {user?.mutualCount} mutual
                    </span>
                )}
            </div>
        </div>
    );
}

export default function SuggestedFriend() {
    const [search, setSearch] = useState('');

const { data: suggestions, isLoading } = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
    select: (data) => {
        console.log('Full response:', data); 
        return data.data.data.suggestions
    }
});

    const filtered = suggestions?.filter(user =>
        user?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <UserAdd size={20} className="text-blue-600" />
                    <h3 className="font-bold text-gray-800">Suggested Friends</h3>
                </div>
                {suggestions?.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                        {suggestions.length}
                    </span>
                )}
            </div>

            <Input
                placeholder="Search friends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="sm"
                radius="full"
                variant="flat"
                classNames={{ inputWrapper: "bg-gray-100 mb-3" }}
                startContent={
                    <svg className="text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                }
            />

            {isLoading && (
                <div className="flex justify-center py-6"><Spinner color="primary" /></div>
            )}

            {!isLoading && filtered?.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-6">No suggestions found</p>
            )}

            <div className="flex flex-col gap-2">
                {filtered?.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
}