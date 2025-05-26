"use client";

import { AuthModal } from "@/shared/components";
import Link from "next/link";
import React from "react";

export default function AccessDeniedPage() {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const onCloseAuth = () => {
    setOpenAuthModal(false);
  };

  console.log(openAuthModal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="flex items-center space-x-20 max-w-6xl mx-auto">
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Ограниченный доступ
                </div>
              </div>

              <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 leading-tight">
                Доступ
                <br />
                <span className="text-transparent bg-clip-text bg-primary">запрещён</span>
              </h1>

              <p className="text-2xl text-gray-600 leading-relaxed font-light">
                Эта страница доступна только для
                <br />
                <span className="font-semibold text-gray-800">авторизованных пользователей</span>
              </p>
            </div>
            <AuthModal open={openAuthModal} onClose={() => onCloseAuth()} />

            <div className="flex space-x-6">
              <button
                onClick={() => setOpenAuthModal(true)}
                className="group relative bg-primary text-white w-[200px] px-4  rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center space-x-3">
                  <span>Войти в аккаунт</span>
                </span>
              </button>

              <Link href={"/"}>
                <button className="group w-[200px] bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:border-orange-300 transform hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center space-x-3">
                    <span> На главную</span>
                  </span>
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full animate-pulse delay-150"></div>
              </div>
              <div className="text-sm text-gray-500 font-medium">Система безопасности активна</div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-gray-50 to-gray-200 rounded-full"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-red-100 to-orange-100 rounded-full"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
                      <div className="text-6xl text-white">🔒</div>
                    </div>

                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                      <div className="text-2xl">⚡</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-24 h-32">
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-14 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full shadow-md"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-orange-700 to-orange-600 rounded-full"></div>
                  <div className="absolute top-14 left-5 w-4 h-10 bg-gradient-to-b from-orange-300 to-orange-200 rounded-full"></div>
                  <div className="absolute top-14 right-5 w-4 h-10 bg-gradient-to-b from-orange-300 to-orange-200 rounded-full"></div>

                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="absolute -top-12 -left-12 flex space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-pink-400 to-red-400 rounded-full "></div>
                <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full  delay-75"></div>
                <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full  delay-150"></div>
              </div>

              <div className="absolute -bottom-16 -left-16 flex space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg transform rotate-45 animate-pulse"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-green-400 rounded-lg transform rotate-12 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Система защищена</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div>Next Pizza Security</div>
          </div>
        </div>
      </div>
    </div>
  );
}
