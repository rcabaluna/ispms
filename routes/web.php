<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemsController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\StockinController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryRequestsController;
use App\Http\Controllers\RISController;

// Admin-only routes
    Route::controller(InventoryItemsController::class)
        ->prefix('inventory/items')
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/breakdown', 'getItemsBreakDown')->name('items.breakdown');
            Route::delete('/{invitemsid}', 'destroy')->name('items.destroy');
            Route::put('/{invitemsid}', 'update')->name('items.update');
            Route::get('/available','availabeItems')->name('items.available');
        });

    Route::controller(RISController::class)
        ->prefix('inventory/ris')
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store')->name('ris.store');
            Route::get('/data/{empnumber}', [RISController::class, 'employeee_ris'])->name('ris.employee_ris');
        });

    Route::resource('inventory/stock-in', StockinController::class);
    

// Guest/public access routes
Route::get('items/request', [RequestController::class, 'index']);
Route::post('items/request', [RequestController::class, 'store'])->name('request.store');
Route::get('items/request/sent', [RequestController::class, 'requestSent'])->name('request.sent');


// Staff Requests
Route::get('inventory/requests', [InventoryRequestsController::class, 'index']);
Route::get('inventory/requests/details/{requestsummaryid}', [InventoryRequestsController::class, 'show'])->name('requests.show');


Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');