'use server';

import { signIn,signOut } from "@/auth"

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/donate"});
    console.log(action);
    
}

export async function doLogout() {
    await signOut({ redirectTo: "/"})
}