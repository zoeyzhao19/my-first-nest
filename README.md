## Description
A NestJS project for personal practice, mainly refer to  [meeting room](https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/meeting_room_booking_system_backend?mode=light)
## New Feature
- [CQRS support](/libs//mediator/src/mediator.service.ts)
- DDD design practice
- mongo replica sets support

## Usage
- use docker to run mongo and redis containers
- update system host file for mongo replica sets mapping

  ```
  127.0.0.1 mongo1
  127.0.0.1 mongo2
  127.0.0.1 mongo3
  ```

- initial `roles` collection

  ```bash
  pnpm install
  pnpm seed:dev
  ```
- update **nodemailer_auth_email** and **nodemailer_auth_code** in `env.development` to use email service
- run the app

  ```bash
  pnpm start:dev
  ```
### Notes
  Example to use `mongo transaction`.

  For test showed, **Repository.save()** does not work with transaction. 
   
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

    await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err
    } finally {
      await session.endSession()
    }
  }
  ```

## References
- [mediatr-ts](https://github.com/m4ss1m0g/mediatr-ts)
- [Domain-Driven-Design](https://khalilstemmler.com/articles/categories/domain-driven-design)
- [CQRS](https://blog.christian-schou.dk/how-to-implement-cqrs-with-mediatr-in-asp-net/)
## License
MIT