import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [OwnersResolver, OwnersService],
  imports: [
    TypeOrmModule.forFeature([Owner, Menu]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret701',
      signOptions: {
        expiresIn: 7776000,
      },
    }),
  ],
})
export class OwnersModule {}
