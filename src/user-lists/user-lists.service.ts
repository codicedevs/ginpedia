import { Injectable } from "@nestjs/common";
import { CreateUserListDto } from "./dto/create-user-list.dto";
import { UpdateUserListDto } from "./dto/update-user-list.dto";
import { UserProduct } from "./entities/user-list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "ratings/entities/rating.entity";
import { Repository } from "typeorm";
import { Product } from "products/entities/product.entity";
import { User } from "users/entities/user.entity";

@Injectable()
export class UserListsService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userListRepository: Repository<UserProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createNewItemList(createNewItemListDto) {
    const { productId, userId, type } = createNewItemListDto;
    const productSel = await this.productRepository.findOneByOrFail({
      productId: productId,
    });
    const userSel = await this.userRepository.findOneByOrFail({ id: userId });

    this.userListRepository.save({
      productId: productSel,
      userId: userSel,
      type,
    });
  }

  findAll() {
    return `This action returns all userLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userList`;
  }

  update(id: number, updateUserListDto: UpdateUserListDto) {
    return `This action updates a #${id} userList`;
  }

  remove(id: number) {
    return `This action removes a #${id} userList`;
  }
}
