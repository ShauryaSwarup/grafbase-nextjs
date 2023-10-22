import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {categoryFilters} from "@/constants";
import Image from "next/image";

type Props = {
    title: string;
    state: string;
    filters: string[];
    setState: (value: string) => void;
};
const CustomMenu = ({ title, state, filters, setState }: Props) => {
    return (
        <div className="flexStart flex-col w-full gap-7 relative">
            <label htmlFor={title} className="w-full text-gray-100">
                {title}
            </label>
            <Menu as="div" className="self-start relative">
                <div>
                    <Menu.Button className="flexCenter custom_menu-btn">
                        {state || "Select a category"}
                        <Image
                            src="/arrow-down.svg"
                            width={10}
                            height={5}
                            alt="Arrow down"
                        />
                    </Menu.Button>
                </div>
                <Menu.Items className="absolute left-0 w-full bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="py-1">
                            {filters.map((filter) => (
                                <Menu.Item key={filter}>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-gray-800 font-bold"
                                                    : "text-gray-100"
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            onClick={() => setState(filter)}
                                        >
                                            {filter}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Transition>
                </Menu.Items>
            </Menu>
        </div>
    )
};

export default CustomMenu;
