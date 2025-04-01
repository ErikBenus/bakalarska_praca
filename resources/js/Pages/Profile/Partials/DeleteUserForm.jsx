import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Odstrániť účet
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Po odstránení účtu budú všetky jeho zdroje a údaje
                    trvalo vymazané. Pred odstránením účtu si prosím stiahnite
                    všetky dáta alebo informácie, ktoré si chcete ponechať.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Odstrániť účet
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Ste si istý, že chcete odstrániť svoj účet?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Po odstránení účtu budú všetky jeho zdroje a
                        údaje trvalo vymazané. Zadajte prosím svoje heslo, aby
                        ste potvrdili, že chcete trvalo odstrániť svoj účet.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Heslo"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Heslo"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Zrušiť
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Odstrániť účet
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
