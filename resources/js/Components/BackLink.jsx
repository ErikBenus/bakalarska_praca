import {Link} from "@inertiajs/react";

export default function BackLink({routeName, text}) {
    return (
        <Link
            href={route(routeName)}
            className="text-blue-400 hover:text-blue-500 transition duration-150 ease-in-out"
        >
            ← Späť na {text}
        </Link>
    );
}
