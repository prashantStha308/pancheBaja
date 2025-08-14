import React from 'react'
import {motion} from 'motion/react'
import Heart from '../icons/Heart'

const LoadingList = () => {
    return (
        <section>
            <table className="w-full table-fixed border-spacing-y-2">
                <thead className="text-xs text-white-tersery/55">
                    <tr>
                        <th className="p-2 w-1/2"> 
                            <div className="flex gap-3">
                                <span>#</span>
                                <span>Title</span>
                            </div>
                        </th>
                        <th className="text-left p-2 w-1/3">Artists</th> 
                        <th className="p-2 w-1/6"> 
                            <div className="flex gap-6 justify-end">
                                <span className="text-left">Duration</span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className="text-xs md:text-xs text-white-secondary">
                    {[1, 2, 3, 4].map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className='p-4'>
                                <div className="bg-hover-primary h-2 w-24 md:w-32 rounded-xs overflow-hidden">
                                    <motion.div
                                        animate={{ x: [-40, 150] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                        className='h-full w-4 blur-xs bg-white/15'
                                    />
                                </div>
                            </td>
                            <td className='p-4'>
                                <div className="bg-hover-primary h-2 w-16 md:w-24 rounded-xs overflow-hidden">
                                    <motion.div
                                        animate={{ x: [-40, 100] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                        className='h-full w-4 blur-xs bg-white/15'
                                    />
                                </div>
                            </td>
                            <td className='p-4'>
                                <div className="bg-hover-primary h-2 w-12 rounded-xs overflow-hidden ml-auto">
                                    <motion.div
                                        animate={{ x: [-40, 100] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                        className='h-full w-4 blur-xs bg-white/15'
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default LoadingList