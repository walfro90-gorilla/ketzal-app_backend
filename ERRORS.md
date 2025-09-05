 node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:102:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

102       expect(prisma.wallets.create).not.toHaveBeenCalled();
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:107:17 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

107         (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);
                    ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:108:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

108         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(null);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:109:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

109         (prisma.wallets.create as jest.Mock).mockResolvedValue(newWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:110:17 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

110         (prisma.wallet_transactions.create as jest.Mock).mockResolvedValue({});
                    ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:114:23 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

114         expect(prisma.wallets.create).toHaveBeenCalledWith({
                          ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:118:23 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

118         expect(prisma.wallet_transactions.create).toHaveBeenCalledWith({
                          ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:131:15 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

131       (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
                  ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:142:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

142       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:143:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

143       (prisma.wallets.update as jest.Mock).mockResolvedValue(updatedWalletData);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:147:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

147       expect(prisma.wallets.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:148:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

148       expect(prisma.wallets.update).toHaveBeenCalledWith({
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:155:21 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

155       expect(prisma.wallet_transactions.create).toHaveBeenCalledWith(expect.objectContaining({
                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:163:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

163         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:164:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

164         (prisma.wallets.update as jest.Mock).mockResolvedValue(updatedWalletData);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:168:23 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

168         expect(prisma.wallets.update).toHaveBeenCalledWith({
                          ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:175:23 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

175         expect(prisma.wallet_transactions.create).toHaveBeenCalledWith(expect.objectContaining({
                          ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:183:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

183         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:184:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

184         (prisma.wallets.update as jest.Mock).mockResolvedValue(updatedWalletData);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:188:23 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

188         expect(prisma.wallet_transactions.create).toHaveBeenCalledWith(expect.objectContaining({
                          ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:196:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

196         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(null);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:197:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

197         (prisma.wallets.create as jest.Mock).mockResolvedValue(newWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:198:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

198         (prisma.wallets.update as jest.Mock).mockResolvedValue(newWallet); // This call is now important
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:202:23 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

202         expect(prisma.wallets.create).toHaveBeenCalledWith({
                          ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:207:23 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

207         expect(prisma.wallets.update).toHaveBeenCalledWith({
                          ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:222:15 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

222       (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
                  ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:223:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

223       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:224:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

224       (prisma.wallets.update as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:228:21 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

228       expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { email: mockRecipientUser.email }, include: { wallet: true } });
                        ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:229:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

229       expect(prisma.wallets.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:231:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

231       expect(prisma.wallets.update).toHaveBeenCalledTimes(2);
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:232:21 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

232       expect(prisma.wallet_transactions.create).toHaveBeenCalledTimes(2);
                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:240:17 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

240         (prisma.users.findUnique as jest.Mock).mockResolvedValue(recipientWithoutWallet);
                    ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:241:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

241         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:242:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

242         (prisma.wallets.create as jest.Mock).mockResolvedValue(newRecipientWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:243:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

243         (prisma.wallets.update as jest.Mock).mockImplementation((args) => {
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:251:23 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

251         expect(prisma.wallets.create).toHaveBeenCalledWith({
                          ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:258:15 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

258       (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
                  ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:265:17 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

265         (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
                    ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:266:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

266         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(null);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:274:17 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

274         (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
                    ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:275:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

275         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(poorWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:283:17 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

283         (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
                    ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.spec.ts:284:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

284         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(poorWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:295:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

295       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:296:15 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

296       (prisma.wallet_transactions.findMany as jest.Mock).mockResolvedValue(mockTransactions);
                  ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:297:15 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

297       (prisma.wallet_transactions.count as jest.Mock).mockResolvedValue(5);
                  ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:301:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

301       expect(prisma.wallets.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:302:21 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

302       expect(prisma.wallet_transactions.findMany).toHaveBeenCalledWith({
                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:308:21 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

308       expect(prisma.wallet_transactions.count).toHaveBeenCalledWith({ where: { walletId: mockWallet.id } });
                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:319:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

319       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(null);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:329:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

329       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:330:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

330       (prisma.wallets.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 900, balanceAxo: 580 });   
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:334:21 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

334       expect(prisma.wallets.update).toHaveBeenCalledWith(expect.objectContaining({
                        ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:337:21 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

337       expect(prisma.wallet_transactions.create).toHaveBeenCalledWith(expect.objectContaining({
                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:353:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

353         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:354:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

354         (prisma.wallets.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 1110, balanceAxo: 400 });
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:358:36 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

358         const updateCall = (prisma.wallets.update as jest.Mock).mock.calls[0][0];
                                       ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:361:49 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

361                 const transactionCall = (prisma.wallet_transactions.create as jest.Mock).mock.calls[0][0];
                                                    ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.spec.ts:372:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

372       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(poorWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:380:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

380         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(poorWallet);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:387:15 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

387       (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(mockWallet);
                  ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:394:17 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

394         (prisma.wallets.findUnique as jest.Mock).mockResolvedValue(null);
                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.spec.ts:404:7 - error TS2451: Cannot redeclare block-scoped variable 'mockPrismaService'.      

404 const mockPrismaService = {
          ~~~~~~~~~~~~~~~~~

src/wallet/wallet.service.ts:12:36 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

12     const user = await this.prisma.users.findUnique({
                                      ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.ts:23:36 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

23     let wallet = await this.prisma.wallets.findUnique({
                                      ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:35:34 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

35       wallet = await this.prisma.wallets.create({
                                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:47:25 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

47       await this.prisma.wallet_transactions.create({
                           ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.ts:72:36 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

72     let wallet = await this.prisma.wallets.findUnique({
                                      ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:77:34 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

77       wallet = await this.prisma.wallets.create({
                                    ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:86:45 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

86     const updatedWallet = await this.prisma.wallets.update({
                                               ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:98:23 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

98     await this.prisma.wallet_transactions.create({
                         ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.ts:120:41 - error TS2551: Property 'users' does not exist on type 'PrismaService'. Did you mean 'user'?

120     const recipient = await this.prisma.users.findUnique({
                                            ~~~~~

  node_modules/.prisma/client/index.d.ts:387:7
    387   get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
              ~~~~
    'user' is declared here.

src/wallet/wallet.service.ts:133:44 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

133     const senderWallet = await this.prisma.wallets.findUnique({
                                               ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:156:43 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

156       recipientWallet = await this.prisma.wallets.create({
                                              ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:221:38 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

221     const wallet = await this.prisma.wallets.findUnique({
                                         ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:232:44 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

232     const transactions = await this.prisma.wallet_transactions.findMany({
                                               ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.ts:239:37 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

239     const total = await this.prisma.wallet_transactions.count({
                                        ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

src/wallet/wallet.service.ts:263:38 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

263     const wallet = await this.prisma.wallets.findUnique({
                                         ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:305:45 - error TS2551: Property 'wallets' does not exist on type 'PrismaService'. Did you mean 'wallet'?

305     const updatedWallet = await this.prisma.wallets.update({
                                                ~~~~~~~

  node_modules/.prisma/client/index.d.ts:407:7
    407   get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
              ~~~~~~
    'wallet' is declared here.

src/wallet/wallet.service.ts:317:23 - error TS2551: Property 'wallet_transactions' does not exist on type 'PrismaService'. Did you mean 'walletTransaction'?

317     await this.prisma.wallet_transactions.create({
                          ~~~~~~~~~~~~~~~~~~~

  node_modules/.prisma/client/index.d.ts:417:7
    417   get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
              ~~~~~~~~~~~~~~~~~
    'walletTransaction' is declared here.

[4:31:04 PM] Found 240 errors. Watching for file changes.