

## Description


## Installation

## Running the app

## Test



## License

### 记录
- 连接本地mongo副本集需要配置host映射

  127.0.0.1 mongo1
  127.0.0.1 mongo2
  127.0.0.1 mongo3
- 初始化角色

  ```bash
  pnpm run seed:dev
  ```
- mongo transaction
   repository.save 不支持session
   
  ```js
  @InjectEntityManager()
  private entityManager: MongoEntityManager

  handle() {
    const session = this.entityManager.mongoQueryRunner.databaseConnection.startSession();
    try {
      session.startTransaction();

      xxxRepository.updateOne({
        _id: new ObjectId(xxxId)
    }, {$set: xxxEntity}, {session})
    } catch (err) {
      await session.abortTransaction();
      throw err
    } finally {
      await session.endSession()
    }
  }
  ```
