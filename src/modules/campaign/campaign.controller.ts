import { Controller, Post, Body, Get, Param, Put, Delete, Patch } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from 'src/dto/createCampaign.dto';
import { Campaign } from 'src/entities/campaign.entity';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('campaigns') 
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Campaign created successfully.', type: Campaign })
  async create(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    return this.campaignService.createCampaign(createCampaignDto);
  }


  @Get()
  @ApiResponse({ status: 200, description: 'List of campaigns.', type: [Campaign] })
  async findAll(): Promise<Campaign[]> {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'Campaign found.', type: Campaign })
  async findOne(@Param('id') id: string): Promise<Campaign> {
    return this.campaignService.findOne(id);
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of campaigns for the user.', type: [Campaign] })
  async getCampaignsByUserId(@Param('userId') userId: string): Promise<Campaign[]> {
    return this.campaignService.getCampaignsByUserId(userId);
  }

  @Post('groups')
  @ApiResponse({ status: 200, description: 'List of campaigns for the given group IDs.', type: [Campaign] })
  async getCampaignsByGroups(@Body() body: { groupIds: string[] }): Promise<Campaign[]> {
    return this.campaignService.getCampaignsByGroups(body.groupIds);
  }

  @Delete()
  async deleteCampaign(@Body('ids') ids: string[]) {
   return this.campaignService.deleteCampaign(ids);   
  }


  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Campaign replaced successfully.', type: Campaign })
  async replace(
    @Param('id') campaignId: string, 
    @Body() CreateCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    return this.campaignService.updateCampaign(campaignId, CreateCampaignDto);
  }
}