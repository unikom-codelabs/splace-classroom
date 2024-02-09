"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import NextLink from 'next/link';
import { showFormattedDate } from '@/utils/timeStamp';
import { Button } from '@nextui-org/button';
import fetchApi from '@/utils/fetchApi';

export default function ModuleItem({userRole,module}:any) {
  const { id,name, description, path } = module || {};
  const handleDeleteModule = async(e:any,id:any) => {
    e.preventDefault();
    await fetchApi(`/resources/${id}`, 'DELETE');
    window.location.reload();
  }
  return (
    <div className='border-b-2 border-/30'>
      <div className="group flex gap-3 flex-row py-2 px-4 cursor-pointer justify-between items-center">
        <NextLink href={`${path}`} className='flex gap-3 flex-row'>
          <div className='rounded-3xl w-10 bg-dark-blue flex justify-center items-center p-2'>
            <FontAwesomeIcon icon={ faFileLines } className='fa-xl text-white'/>
          </div>
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{description}</p>
          </div>
        </NextLink>
        {userRole !== 'STUDENT' && (
          <div className='group-hover:flex hidden'>
            <Button color='danger' size='sm' onClick={(e)=>handleDeleteModule(e,id)}>Delete</Button>
          </div>
        )}
      </div>
    </div>
  )
}
