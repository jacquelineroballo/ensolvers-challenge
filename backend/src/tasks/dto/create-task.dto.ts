import { IsNotEmpty, IsString, IsOptional, IsEnum, Length, IsBoolean } from 'class-validator'

export class CreateTaskDto {
	@IsNotEmpty({ message: 'Title is required' })
	@IsString()
	@Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
	title: string

	@IsNotEmpty({ message: 'Description is required' })
	@IsString()
	@Length(10, 200, { message: 'Description must be between 10 and 200 characters' })
	description: string

	@IsOptional()
	@IsEnum(['pending', 'in_progress', 'completed'], { message: 'Status is not valid' })
	status?: 'pending' | 'in_progress' | 'completed' = 'pending'

	@IsOptional()
	@IsBoolean()
	archived?: boolean = false
}
