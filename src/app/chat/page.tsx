"use client";

import { useMemo, useRef, useState } from "react";
import type { JSX, KeyboardEvent } from "react";
import {
    ArrowUp,
    ChevronDown,
    Github,
    Languages,
    Menu,
    Moon,
    Mountain,
    Plus,
    Search,
    Wind,
} from "lucide-react";
import clsx from "clsx";

type QuickPrompt = {
    title: string;
    description?: string;
    badge?: string;
    icon: JSX.Element;
    iconColor: string;
};

const API_ENDPOINTS = {
    sendMessage: "",
    listModels: "",
};

const quickPrompts: QuickPrompt[] = [
    {
        title: "Why use Nuxt UI?",
        icon: <Mountain className="h-4 w-4" />,
        iconColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    {
        title: "Help me create a Vue composable",
        icon: <span className="text-sm font-bold">V</span>,
        iconColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    {
        title: "Tell me more about UnJS",
        icon: <span className="text-xs font-bold">un</span>,
        iconColor: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
    },
    {
        title: "Why should I consider VueUse?",
        icon: <span className="text-sm font-bold">U</span>,
        iconColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    {
        title: "Tailwind CSS best practices",
        icon: <Wind className="h-4 w-4" />,
        iconColor: "bg-cyan-500/10 text-cyan-300 border border-cyan-400/20",
    },
    {
        title: "What is the weather in Bordeaux?",
        icon: <span className="text-sm">☀</span>,
        iconColor: "bg-gray-100/10 text-gray-300 border border-white/10",
    },
    {
        title: "Show me a chart of sales data",
        icon: <span className="text-sm">↗</span>,
        iconColor: "bg-white/5 text-gray-300 border border-white/10",
    },
];

const handleKeyActivate = (
    event: KeyboardEvent,
    action: () => void,
): void => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
    }
};

const ChatPage = (): JSX.Element => {
    const [message, setMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("openai/gpt-5-nano");
    const [isSending, setIsSending] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const canSend = useMemo(
        () => Boolean(message.trim()) && !isSending,
        [isSending, message],
    );

    const handleSend = async (): Promise<void> => {
        const trimmed = message.trim();
        if (!trimmed) return;
        if (!API_ENDPOINTS.sendMessage) {
            console.warn("请替换 API_ENDPOINTS.sendMessage 为真实接口地址");
            return;
        }
        setIsSending(true);
        try {
            await fetch(API_ENDPOINTS.sendMessage, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed, model: selectedModel }),
            });
        } catch (error) {
            console.error("发送消息失败", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleSelectPrompt = (text: string): void => {
        setMessage(text);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSelectModel = (): void => {
        if (!API_ENDPOINTS.listModels) {
            console.warn("请替换 API_ENDPOINTS.listModels 为真实接口地址");
            return;
        }
        // 预留模型选择逻辑
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl bg-[#0f0f0f]/80 backdrop-blur-sm">
                <aside className="hidden w-20 flex-col justify-between border-r border-white/5 bg-[#0b0b0b] px-4 py-6 lg:flex">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                            <img
                                src="/favicon.ico"
                                alt="App logo"
                                className="h-6 w-6"
                            />
                        </div>
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                            aria-label="Search"
                            tabIndex={0}
                            onClick={() => { }}
                            onKeyDown={(event) => handleKeyActivate(event, () => { })}
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                            aria-label="New chat"
                            tabIndex={0}
                            onClick={() => { }}
                            onKeyDown={(event) => handleKeyActivate(event, () => { })}
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                        aria-label="Login with GitHub"
                        tabIndex={0}
                        onClick={() => { }}
                        onKeyDown={(event) => handleKeyActivate(event, () => { })}
                    >
                        <Github className="h-5 w-5" />
                    </button>
                </aside>

                <main className="flex flex-1 flex-col gap-8 px-4 py-6 sm:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                                aria-label="Open navigation"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(event) => handleKeyActivate(event, () => { })}
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3">
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                                aria-label="Toggle theme"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(event) => handleKeyActivate(event, () => { })}
                            >
                                <Moon className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
                                aria-label="New chat"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(event) => handleKeyActivate(event, () => { })}
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                            How can I help you today?
                        </h1>

                        <div className="rounded-3xl border border-white/10 bg-[#111] shadow-lg">
                            <div className="flex flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4">
                                <input
                                    ref={inputRef}
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Type your message here..."
                                    className="h-12 w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                                    aria-label="Message input"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:border-white/25 hover:text-white"
                                            aria-label="Select model"
                                            tabIndex={0}
                                            onClick={handleSelectModel}
                                            onKeyDown={(event) => handleKeyActivate(event, handleSelectModel)}
                                        >
                                            {selectedModel}
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!canSend}
                                        className={clsx(
                                            "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition",
                                            canSend && "bg-white/10 hover:border-white/25 hover:bg-white/15",
                                            !canSend && "bg-white/5 text-white/30",
                                        )}
                                        aria-label="Send message"
                                        tabIndex={0}
                                        onClick={handleSend}
                                        onKeyDown={(event) => handleKeyActivate(event, handleSend)}
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {quickPrompts.map((prompt) => (
                                <button
                                    key={prompt.title}
                                    type="button"
                                    className="flex items-center gap-3 rounded-full border border-white/15 bg-[#151515] px-3 py-2 text-left text-white/90 transition hover:border-white/30"
                                    aria-label={prompt.title}
                                    tabIndex={0}
                                    onClick={() => handleSelectPrompt(prompt.title)}
                                    onKeyDown={(event) =>
                                        handleKeyActivate(event, () => handleSelectPrompt(prompt.title))
                                    }
                                >
                                    <span
                                        className={clsx(
                                            "flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-semibold uppercase",
                                            prompt.iconColor,
                                        )}
                                    >
                                        {prompt.icon}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-white">
                                            {prompt.title}
                                        </span>
                                        {prompt.description ? (
                                            <span className="text-xs text-white/60">
                                                {prompt.description}
                                            </span>
                                        ) : null}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
                <button
                    type="button"
                    className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#d96c88] text-white shadow-lg transition hover:bg-[#c45a75] focus:outline-none focus:ring-2 focus:ring-[#d96c88] focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
                    aria-label="Language"
                >
                    <Languages className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
