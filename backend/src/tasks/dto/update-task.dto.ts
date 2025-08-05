import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString, IsEnum, Length, IsBoolean } from 'class-validator'
import { CreateTaskDto } from './create-task.dto'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	@IsOptional()
	@IsString()
	@Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
	title?: string

	@IsOptional()
	@IsString()
	@Length(10, 200, { message: 'Description must be between 10 and 200 characters' })
	description?: string

	@IsOptional()
	@IsEnum(['pending', 'in_progress', 'completed'], {
		message: 'Status must be pending, in_progress or completed',
	})
	status?: 'pending' | 'in_progress' | 'completed'

	@IsOptional()
	@IsBoolean()
	archived?: boolean
}
