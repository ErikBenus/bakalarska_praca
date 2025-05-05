import NavLink from '@/Components/NavLink';
import {usePermissions} from "@/Components/UsePermissions.jsx";
import React from "react";

function ShowTrainersButton() {
    const {can} = usePermissions();

    if (can("use admin privileges")) {
        return (
            <NavLink
                href={route('trainers.index')}
                active={route().current('trainers.*')}
            >
                Zoznam trénerov
            </NavLink>
        );
    }

    return null;
}

export default function NavMenuTrainer() {
    const {can} = usePermissions();
    if (can('see trainer dashboard')) {

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
                    href={route('clients.index')}
                    active={route().current('clients.index')}
                >
                    Zoznam klientov
                </NavLink>
                <NavLink
                    href={route('history.all.tests')}
                    active={route().current('history.all.tests')}
                >
                    História testovaní
                </NavLink>

                <ShowTrainersButton/>
            </div>
        );
    }
}
