"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, decorators_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
//# sourceMappingURL=current-user.decorator.js.map