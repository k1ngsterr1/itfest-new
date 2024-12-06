'use client'

import { useState, useEffect } from 'react'
import { Plus, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Employee {
    id: number
    image: string
    name: string
    companyName: string
    salary: string
}

export function StaffWidget() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
        image: '',
        name: '',
        companyName: '',
        salary: '',
    })

    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://itfest-backend-production.up.railway.app/api/employers/get-employers/:companyName',)
            if (!response.ok) {
                throw new Error('Failed to fetch employees')
            }
            const data = await response.json()
            setEmployees(data)
        } catch (error) {
            console.error('Error fetching employees:', error)
        }
    }

    // Fetch employees when component mounts
    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewEmployee(prev => ({
            ...prev,
            [name]: name === 'salary' ? parseFloat(value) : value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewEmployee(prev => ({ ...prev, image: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            if (avatarFile) {
                formData.append('image', avatarFile)
            }
            formData.append('name', newEmployee.name)
            formData.append('companyName', newEmployee.companyName)
            formData.append('salary', newEmployee.salary.toString())


            const response = await fetch('https://itfest-backend-production.up.railway.app/api/employers/add-employee', {
                method: 'POST',
                body: formData,
            })



            if (!response.ok) {
                throw new Error('Failed to add employee')
            }

            const result = await response.json()
            setEmployees(prev => [...prev, {
                ...result,
                image: result.image || newEmployee.image,
            }])

            setIsOpen(false)
            setAvatarFile(null)
            setNewEmployee({ image: '', name: '', companyName: '', salary: '' })
        } catch (error) {
            console.error('Error adding employee:', error)
            // You might want to show an error message to the user here
        }
    }

    return (
        <div className="w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Employee</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="avatar">Image</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="avatar"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                    >
                                        {avatarFile ? (
                                            <img
                                                src={URL.createObjectURL(avatarFile)}
                                                alt="Avatar Preview"
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        ) : newEmployee.image ? (
                                            <img
                                                src={newEmployee.image}
                                                alt="Avatar Preview"
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full">
                                                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    Нажмите для загрузки или перетащите
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    SVG, PNG, JPG или GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                        )}
                                        <Input
                                            id="avatar"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    value={newEmployee.companyName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary</Label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    value={newEmployee.salary}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Add Employee</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Salary</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={employee.image} alt={employee.name} />
                                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.companyName}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
