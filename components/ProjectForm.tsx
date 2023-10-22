"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    type: string;
    session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (type === "create") {
                const { token } = await fetchToken();
                await createNewProject(form, session?.user?.id, token);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes("image")) {
            return alert("Please upload an image file");
        }
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange("image", result);
        };
    };

    const handleStateChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        image: "",
        title: "",
        description: "",
        liveSiteUrl: "",
        githubUrl: "",
        category: "",
    });
    return (
        <form onSubmit={handleFormSubmit} className='flexStart form'>
            {/*Image*/}
            <div className='flexStart form_image-container'>
                <label htmlFor='poster' className='flexCenter form_image-label'>
                    {!form.image && "Choose a poster for your project!"}
                </label>
                <input
                    id='image'
                    type='file'
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className='form_image-input'
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form.image}
                        className='sm:p-10 object-contain z-20'
                        fill
                        alt='Poster'
                    />
                )}
            </div>
            {/* Form-fields */}
            <FormField
                title='Title'
                state={form.title}
                placeholder='Flexibble'
                setState={(value) => handleStateChange("title", value)}
            />
            <FormField
                title='Description'
                state={form.description}
                placeholder='Showcase and discover remarkable developer projects.'
                setState={(value) => handleStateChange("description", value)}
            />
            <FormField
                type='url'
                title='Website URL'
                state={form.liveSiteUrl}
                placeholder='https://flexibble.com'
                setState={(value) => handleStateChange("liveSiteUrl", value)}
            />
            <FormField
                type='url'
                title='GitHub URL'
                state={form.githubUrl}
                placeholder='https://github.com/flexibble/flexibble'
                setState={(value) => handleStateChange("githubUrl", value)}
            />
            {/* Custom Menu */}
            <CustomMenu
                title='Category'
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />
            {/* Submit */}
            <Button
                title={
                    isSubmitting
                        ? `${type === "create" ? "Creating" : "Editing"}`
                        : `${type === "create" ? "Create" : "Edit"}`
                }
                type='submit'
                leftIcon={isSubmitting ? "" : "/plus.svg"}
                isSubmitting={isSubmitting}
            />
        </form>
    );
};

export default ProjectForm;
