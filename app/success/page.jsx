import Link from "next/link";
const success = () => {
    return (  <div class="flex items-center justify-center h-screen">
        <div class="p-1 rounded shadow-lg ">
            <div class="flex flex-col items-center p-4 space-y-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1
                    class="text-4xl font-bold  bg-clip-text">
                    GREAT !</h1>
                <p>Your account confirmation has been completed successfully.</p>
                <Link
                    href="/signin"
                    class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span class="text-sm font-medium">
                        Log In
                    </span>
                    
                </Link>
            </div>
        </div>
    </div>);
}
 
export default success;