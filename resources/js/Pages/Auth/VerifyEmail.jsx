import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Overenie emailu" />

            <div className="mb-4 text-sm text-gray-600">
                Ďakujeme za registráciu! Pred začatím by ste mali overiť
                svoju emailovú adresu kliknutím na odkaz, ktorý sme vám
                práve poslali. Ak ste email neobdržali, radi vám ho
                pošleme znovu.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Nový overovací odkaz bol zaslaný na emailovú adresu,
                    ktorú ste zadali pri registrácii.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Zaslať overovací email znovu
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Odhlásiť sa
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
