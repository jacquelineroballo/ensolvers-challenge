import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
	HttpCode,
	HttpStatus,
	ValidationPipe,
	Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('api/tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
		return this.tasksService.create(createTaskDto)
	}

	@Get()
	findAll(@Query('archived') archived?: string) {
		if (archived === undefined) {
			return this.tasksService.findAll(false) // Por defecto, mostrar solo no archivadas
		}
		const isArchived = archived === 'true'
		return this.tasksService.findAll(isArchived)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tasksService.findOne(id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto) {
		return this.tasksService.update(id, updateTaskDto)
	}

	@Put(':id/toggle-archive')
	toggleArchived(@Param('id') id: string) {
		return this.tasksService.toggleArchived(id)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string) {
		this.tasksService.remove(id)
	}
}
