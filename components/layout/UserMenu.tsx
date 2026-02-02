'use client'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

export default function UserMenu() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Link href='/profile' className="flex flex-col items-center justify-center text-center">
            {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                />
            ) : (
                <FontAwesomeIcon icon={faUser} width={19} color="gray" />
            )}
            <div className="text-xs mt-1">{session.user?.name?.split(' ')[0] || 'Profile'}</div>
        </Link>
        <button onClick={() => signOut()} className="flex flex-col items-center justify-center text-red-500 hover:text-red-700 ml-2" title="Logout">
            <FontAwesomeIcon icon={faSignOutAlt} width={16} />
            <div className="text-xs mt-1">Logout</div>
        </button>
      </div>
    );
  }

  return (
    <Link href='/login' prefetch={false} className="flex flex-col items-center justify-center text-center">
      <FontAwesomeIcon icon={faUser} width={19} color="gray" />
      <div className="text-xs mt-1">Login</div>
    </Link>
  );
}
