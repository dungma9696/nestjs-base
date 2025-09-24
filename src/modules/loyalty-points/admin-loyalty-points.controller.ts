import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoyaltyPointsService } from './loyalty-points.service';
import { AddPointsDto } from './dto/add-points.dto';

@ApiTags('Admin - Loyalty Points')
@ApiBearerAuth('JWT-auth')
@Controller('admin/loyalty-points')
export class AdminLoyaltyPointsController {
  constructor(private readonly loyaltyPointsService: LoyaltyPointsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all loyalty points' })
  @ApiResponse({ status: 200, description: 'Return all loyalty points.' })
  findAll() {
    return this.loyaltyPointsService.getAllLoyaltyPoints();
  }

  @Get('top-users')
  @ApiOperation({ summary: 'Get top users by loyalty points' })
  @ApiResponse({
    status: 200,
    description: 'Return top users by loyalty points.',
  })
  getTopUsers() {
    return this.loyaltyPointsService.getTopUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user loyalty points by ID' })
  @ApiResponse({ status: 200, description: 'Return user loyalty points.' })
  @ApiResponse({ status: 404, description: 'User loyalty points not found.' })
  getUserPoints(@Param('userId') userId: string) {
    return this.loyaltyPointsService.getUserLoyaltyPoints(userId);
  }

  @Post('add-points')
  @ApiOperation({ summary: 'Add points to user' })
  @ApiResponse({
    status: 201,
    description: 'Points have been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  addPoints(@Body() addPointsDto: AddPointsDto) {
    return this.loyaltyPointsService.addPoints(addPointsDto);
  }
}
