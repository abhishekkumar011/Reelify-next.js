"use client";
import Link from "next/link";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch (error) {
      console.error(error);
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar sticky top-0 z-40 border border-gray-300 border-b rounded-lg backdrop-blur-sm">
      <div className="flex container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case"
            prefetch={true}
            onClick={() => showNotification("Welcome to Reelify", "info")}
          >
            <Home className="w-5 h-5" />
            Reelify
          </Link>
        </div>

        <div className="flex flex-1 justify-end px-5 ">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-md rounded-box w-68 mt-4 py-2 bg-gray-300"
              >
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>

                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full cursor-pointer"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        Video Upload
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
