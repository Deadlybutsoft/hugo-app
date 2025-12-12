"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Wallet, LogOut } from 'lucide-react'
import { cls } from './utils'
import { useState, useEffect } from 'react'

export default function WalletButton() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()
    const [mounted, setMounted] = useState(false)

    // Wait for mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return (
        <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
            <Wallet className="h-4 w-4" />
            Connect
        </button>
    );

    if (isConnected && address) {
        return (
            <button
                onClick={() => disconnect()}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                title="Disconnect Wallet"
            >
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {address.slice(0, 6)}...{address.slice(-4)}
                <LogOut className="ml-1 h-3 w-3 opacity-50" />
            </button>
        )
    }

    return (
        <button
            onClick={() => connect({ connector: injected() })}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
            <Wallet className="h-4 w-4" />
            Connect Wallet
        </button>
    )
}
