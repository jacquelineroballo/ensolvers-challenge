import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateTaskDto) {
		return this.prisma.note.create({ data })
	}

	async findAll(archived: boolean) {
		return this.prisma.note.findMany({
			where: { archived },
		})
	}

	async findOne(id: string) {
		return this.prisma.note.findUnique({ where: { id } })
	}

	async update(id: string, data: UpdateTaskDto) {
		return this.prisma.note.update({ where: { id }, data })
	}

	async remove(id: string) {
		return this.prisma.note.delete({ where: { id } })
	}

	async toggleArchived(id: string) {
		const current = await this.prisma.note.findUnique({ where: { id } })
		return this.prisma.note.update({
			where: { id },
			data: { archived: !current.archived },
		})
	}
}
