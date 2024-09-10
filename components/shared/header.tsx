import React from 'react'
import { cn } from '@/lib/utils';
import {Container} from './container'
import Image from 'next/image';
import Logo from './../../app/img/logo.png'
import { Button } from '../ui';
import { UserRoundPlus } from 'lucide-react';


interface Props{
    className?: string;
}

export const Header: React.FC<Props> = ({className}) =>{
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                <div className='flex items-center gap-4 '>
                <Image src={Logo} alt='logo' width={35} height={35} className='mb-2'/>
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next pizza</h1>
                        <p  className='text-sm text-gray-400 leading'>Лиза, пакжи писю</p>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                        
                        <Button variant={'outline'} className='felx items-center gap-1'> <UserRoundPlus  size={16} /> Войти</Button>
                </div>
            </Container>
        </header>
    )
}