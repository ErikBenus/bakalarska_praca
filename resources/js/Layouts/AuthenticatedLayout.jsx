import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import React, {useState} from 'react';
import NavMenuClient from "@/Components/NavMenuClient.jsx";
import NavMenuTrainer from "@/Components/NavMenuTrainer.jsx";
import {usePermissions} from "@/Components/UsePermissions.jsx";

function NavMenuTrainerMobile() {
    const {can} = usePermissions();

    if (can('see trainer dashboard')) {

        return (
            <div className="space-y-1 pb-3 pt-2">
                <ResponsiveNavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                >
                    Prehľad
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route('all-tests.index')}
                    active={route().current('all-tests.*')}
                >
                    Štandardné testy
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('clients.index')}
                    active={route().current('clients.index')}
                >
                    Zoznam klientov
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('history.all.tests')}
                    active={route().current('history.all.tests')}
                >
                    História testovaní
                </ResponsiveNavLink>

                <ShowTrainersMobile/>
            </div>
        );
    }
    return null;
}

function NavMenuClientMobile() {
    const {can} = usePermissions();
    const user = usePage().props.auth.user;
    if (can('see client dashboard')) {

        return (
            <div className="space-y-1 pb-3 pt-2">
                <ResponsiveNavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                >
                    Prehľad
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route('all-tests.index')}
                    active={route().current('all-tests.*')}
                >
                    Štandardné testy
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('history.all.tests')}
                    active={route().current('history.all.tests')}
                >
                    História
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('conclusions.client.view', { clientId: user.id })}
                    active={route().current('conclusions.client.view')}
                >
                    Odporúčania
                </ResponsiveNavLink>
            </div>
        );
    }
    return null;
}

function ShowTrainersMobile() {
    const { can } = usePermissions();

    if (can("use admin privileges")) {
        return (
                <NavLink
                    href={route('trainers.index')}
                    active={route().current('trainers.*')}
                >
                    Zoznam trénerov
                </NavLink>

        );}

    return null;
}

export default function AuthenticatedLayout({ header, rightHeader, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);



    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <NavMenuClient/>
                            <NavMenuTrainer/>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.first_name + " " +user.last_name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Odhlásiť sa
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <NavMenuTrainerMobile />
                    <NavMenuClientMobile />

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Odhlásiť sa
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto flex justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                        {rightHeader && <div className="hidden sm:flex sm:items-center">{rightHeader}</div>}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
