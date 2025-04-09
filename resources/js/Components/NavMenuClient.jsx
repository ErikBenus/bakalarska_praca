import NavLink from '@/Components/NavLink';
import {usePermissions} from "@/Components/UsePermissions.jsx";

export default function NavMenuClient() {
    const {can} = usePermissions();
    if (can('see client dashboard')) {

        return (
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                >
                    Prehľad
                </NavLink>
                <NavLink
                    href={route('all-tests.index')}
                    active={route().current('all-tests.*')}
                >
                    Štandardné testy
                </NavLink>
                <NavLink
                    href={route('history.all.tests')}
                    active={route().current('history.all.tests')}
                >
                    História Testovaní
                </NavLink>
                <NavLink
                    href={route('all-tests.index')}
                    active={route().current('all-tests.*')}
                >
                    Odporúčania
                </NavLink>
            </div>
        );
    }
}
