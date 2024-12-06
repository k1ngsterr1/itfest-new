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
import { useUserData } from '@/hooks/useUserData'
import { useTranslation } from 'react-i18next'

interface Employee {
    id: number
    image: string
    name: string
    companyName: string
    salary: string
    photo: string
}

export function StaffWidget() {
    const { t } = useTranslation('staff')
    const { userData: companyName } = useUserData('companyName');
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
        image: '',
        name: '',
        companyName: '',
        salary: '',
        photo: '',
    })


    const fetchEmployees = async () => {

        if (!companyName) return;

        try {
            const response = await fetch(`https://itfest-backend-production.up.railway.app/api/employers/get-employers/${companyName}`)
            if (!response.ok) {
                throw new Error('Failed to fetch employees')
            }
            const data = await response.json()
            console.log('Fetched employees data:', data)
            setEmployees(data)
        } catch (error) {
            console.error('Error fetching employees:', error)
        }
    }

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
            console.log('Selected file:', file)
            setAvatarFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log('File read as data URL:', reader.result)
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
                console.log('Uploading avatar file:', avatarFile)
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
            console.log('Server response after adding employee:', result)

            const imageUrl = result.image?.startsWith('https://res.cloudinary.com')
                ? result.image
                : result.image?.startsWith('http')
                    ? result.image
                    : `https://itfest-backend-production.up.railway.app${result.image}`

            console.log('Final image URL:', imageUrl)

            setEmployees(prev => [...prev, {
                ...result,
                image: imageUrl,
            }])

            setIsOpen(false)
            setAvatarFile(null)
            setNewEmployee({ image: '', name: '', companyName: '', salary: '', photo: '' })
        } catch (error) {
            console.error('Error adding employee:', error)
        }
    }

    return (
        <div className="w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {t("addEmployee")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{t("addNewEmployee")}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="avatar">{t("image")}</Label>
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
                                                    {t("loadPhoto")}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {t("dataType")}
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
                                <Label htmlFor="name">{t("name")}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">{t("companyName")}</Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    value={newEmployee.companyName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">{t("salary")}</Label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    value={newEmployee.salary}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">{t("addEmployee")}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("image")}</TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("companyName")}</TableHead>
                            <TableHead>{t("salary")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={employee.image || employee.photo}
                                            alt={employee.name}
                                            onError={(e) => {
                                                console.log('Image failed to load:', employee.image)
                                                const target = e.target as HTMLImageElement;
                                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}`;
                                            }}
                                        />
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
