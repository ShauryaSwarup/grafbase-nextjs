"use client";
import { useState, useEffect } from "react";

import React from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    // get providers from next-auth
    const [providers, setProviders] = useState<Providers | null>(null);

    // fetch providers on mount
    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            console.log(providers);
            setProviders(providers);
        };
        fetchProviders();
    },[]);


    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider, i) => {
                    return <button key={i} onClick={()=>signIn(provider?.id)}>{provider.id}</button>;
                })}
            </div>
        );
    }
};

export default AuthProviders;
