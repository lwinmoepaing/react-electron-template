const { DEFAULT_PAGE_SIZE, TABLE } = require("../../config");
const { CHECK_VALID_PAGE } = require("../lib/helper");
const paginateHelper = require("../lib/paginateHelper");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const UserLog = require("../model/UserLogModel");
// Self Import

module.exports.GET_ALL_USER_LOG = async (req, res) => {
  try {
    const [userPaginateQuery, userFetch] = [
      new UserLog({ table_name: TABLE.USER_TABLE }),
      new UserLog({ table_name: TABLE.USER_TABLE }),
    ];

    const totalLogs = await userPaginateQuery.count();
    const page = CHECK_VALID_PAGE(req.query.page);
    const paginator = paginateHelper({
      page,
      perPage: DEFAULT_PAGE_SIZE,
      totalRows: totalLogs,
    });

    const users = await userFetch.orderBy("id", "DESC").fetchPage({
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
    });

    res.status(200).json({
      ...successResponse(users),
      pagination: {
        totalCount: totalLogs,
        ...paginator,
      },
    });
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};
