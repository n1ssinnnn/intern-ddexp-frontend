"use client";

import DropdownField from "@/components/Dropdown";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type UserInputs = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    password: string;
    confirmPassword: string;
};

export default function UserDetail() {
    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<UserInputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            role: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<UserInputs> = (data) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col mt-10 mx-10 gap-5 bg-background p-5">
            <div className="flex flex-row justify-between">
                <Link href="/user" className="flex flex-row gap-2 text-gray-600">
                    <ArrowLeft />
                    ย้อนกลับ
                </Link>
                <Button type="button" variant="outlineDestructive">ลบผู้ใช้งาน</Button>
            </div>
            <h1 className="text-3xl font-semibold text-text-primary">แก้ไขผู้ใช้งาน</h1>
            <p className="text-lg font-semibold text-black">ข้อมูลผู้ใช้งาน</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate >
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-5 pb-5 border-b w-full">
                        <div className="flex-1">
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{ required: "กรุณากรอกชื่อจริง" }}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="firstName"
                                        label="ชื่อจริง"
                                        placeholder="กรอกชื่อจริง"
                                        required
                                        error={errors.firstName?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <Controller
                                control={control}
                                name="lastName"
                                rules={{ required: "กรุณากรอกนามสกุล" }}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="lastName"
                                        label="นามสกุล"
                                        placeholder="กรอกนามสกุล"
                                        required
                                        error={errors.lastName?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <p className="text-lg font-semibold text-black">ตั้งค่าบัญชี</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-5 w-full">
                            <div className="flex-1">
                                <Controller
                                    control={control}
                                    name="email"
                                    rules={{
                                        required: "กรุณากรอกอีเมล",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "รูปแบบอีเมลไม่ถูกต้อง",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            id="email"
                                            type="email"
                                            label="อีเมล"
                                            placeholder="กรอกอีเมล"
                                            required
                                            error={errors.email?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <Controller
                                    control={control}
                                    name="company"
                                    rules={{ required: "กรุณากรอกบริษัท" }}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            id="company"
                                            label="บริษัท"
                                            placeholder="กรอกบริษัท"
                                            required
                                            error={errors.company?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <Controller
                            control={control}
                            name="role"
                            rules={{ required: "กรุณาเลือกสิทธิ์การใช้งาน" }}
                            render={({ field }) => (
                                <DropdownField
                                    label="สิทธิการใช้งาน"
                                    placeholder="เลือกสิทธิ์การใช้งาน"
                                    options={[
                                        { label: "user", value: "user" },
                                        { label: "admin", value: "admin" },
                                    ]}
                                    required
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    error={errors.role?.message}
                                />
                            )}
                        />

                        <div className="flex flex-row gap-5 w-full">
                            <div className="flex-1">
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{ required: "กรุณากรอกรหัสผ่าน" }}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            id="password"
                                            type="password"
                                            label="รหัสผ่าน"
                                            placeholder="กรอกรหัสผ่าน"
                                            required
                                            error={errors.password?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    rules={{
                                        required: "กรุณายืนยันรหัสผ่าน",
                                        validate: (value) =>
                                            value === getValues("password") || "รหัสผ่านไม่ตรงกัน",
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            id="confirmPassword"
                                            type="password"
                                            label="ยืนยันรหัสผ่าน"
                                            placeholder="ยืนยันรหัสผ่าน"
                                            required
                                            error={errors.confirmPassword?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-end gap-4 rounded-xl border border-gray-200 bg-white p-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            className="h-10 min-w-28 border-gray-300 text-gray-600"
                        >
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="h-10 min-w-[70px] bg-[#5b63ff] hover:bg-[#4e56eb]">
                            แก้ไข
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}