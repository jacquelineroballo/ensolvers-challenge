import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
	providers: [PrismaService],
	exports: [PrismaService], // Para que otros módulos lo usen
})
export class PrismaModule {}
