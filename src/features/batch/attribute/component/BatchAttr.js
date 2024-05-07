<div className="w-full pt-32">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block overflow-x-auto min-w-full py-2">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="font-medium">
                    <tr className="bg-colorBlue text-white">
                      <th scope="col" className="border-y p-2">
                        {BatchDetailContext.name}
                      </th>
                      <th scope="col" className="border-y p-2">
                        {BatchDetailContext.value}
                      </th>
                      <th scope="col" className="border-y p-2">
                        {BatchDetailContext.action}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchDetail?.attribute?.map((batch, key) => (
                      <tr
                        key={key}
                        className={
                          isOdd(key) ? " bg-white " : " bg-colorIconGray "
                        }
                      >
                        <td className="border-y whitespace-nowrap p-2 font-medium">
                          {batch.name}
                        </td>

                        <td className="border-y whitespace-nowrap p-2 font-medium">
                          {batch.value}
                        </td>
                        {/* <td className=" border-b justify-center flex whitespace-nowrap p-2 font-medium">
                          <FaPen
                            size={25}
                            className="text-green-600 cursor-pointer"
                          />
                        </td> */}
                      </tr>
                    ))}
                    {/* <isStockManager /> */}
                    <BatchAttributeValue />
                    {/* <BatchAttributeNew /> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>