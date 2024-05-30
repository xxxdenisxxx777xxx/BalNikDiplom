import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function DropdownSubject() {
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/subjects')
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Error fetching subjects:', error));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex gap-3'>
            <Menu as="div" className="relative justify-between w-full inline-block text-left">
                <div className='flex justify-between'>
                    <MenuButton className="inline-flex w-full h-9 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {subjects.length > 0 ? "Оберіть предмет" : "Немає данних від БД"}
                    </MenuButton>
                </div>

                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-black">
                        <div className="py-1">
                            {subjects.map(subject => (
                                <MenuItem key={subject._id}>
                                    {({ focus }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {subject.name}
                                        </a>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}
