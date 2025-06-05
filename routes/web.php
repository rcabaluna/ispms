<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\InventoryItemsController;
    use App\Http\Controllers\RequestController;
    use App\Http\Controllers\StockinController;
    use App\Http\Controllers\AuthController;
    use App\Http\Controllers\InventoryRequestsController;
    use App\Http\Controllers\RISController;

        // Public Routes
        Route::get('/', [RequestController::class, 'index']);
        Route::get('login', [AuthController::class, 'index'])->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('auth.login');

        Route::prefix('items/request')->group(function () {
            Route::get('/', [RequestController::class, 'index']);
            Route::post('/', [RequestController::class, 'store'])->name('request.store');
            Route::get('/sent', [RequestController::class, 'requestSent'])->name('request.sent');
        });

        // Protected Routes
        Route::middleware(['web','auth'])->group(function () {
            // Staff Request Routes
            Route::prefix('inventory/requests')->group(function () {
                Route::get('/', [InventoryRequestsController::class, 'index']);
                Route::get('/details/{requestsummaryid}', [InventoryRequestsController::class, 'show'])->name('requests.show');
                Route::put('/acknowledge/{requestsummaryid}', [InventoryRequestsController::class, 'acknowledge'])->name('requests.acknowledge');
                Route::put('/serve/{requestsummaryid}', [InventoryRequestsController::class, 'serve'])->name('requests.serve');
            });

            // Inventory Items
            Route::prefix('inventory/items')->controller(InventoryItemsController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('/available', 'availableItems')->name('items.available');
                Route::post('/breakdown', 'getItemsBreakDown')->name('items.breakdown');
                Route::put('/{invitemsid}', 'update')->name('items.update');
                Route::delete('/{invitemsid}', 'destroy')->name('items.destroy');
            });

            // RIS
            Route::prefix('reports/ris')->controller(RISController::class)->group(function () {
                Route::get('/', 'index');
            });

            // Stock In
            Route::resource('inventory/stock-in', StockinController::class);

            // Logout
            Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        });
