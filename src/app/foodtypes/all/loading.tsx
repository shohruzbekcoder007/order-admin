import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
    return (
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Food Types</h1>
                <p>add</p>
            </div>
            <div className="bg-white rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Description</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1,2,3,4,5].map((element, index) => (
                                    <tr key={element} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td colSpan={4} className="py-3 px-4">
                                            <Skeleton className="w-[100%] h-[20px] rounded-full" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </main>
    )
}

export default Loading