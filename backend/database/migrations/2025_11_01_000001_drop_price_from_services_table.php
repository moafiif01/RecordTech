<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        if (Schema::hasColumn('services', 'price')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('price');
            });
        }
    }

    public function down()
    {
        if (! Schema::hasColumn('services', 'price')) {
            Schema::table('services', function (Blueprint $table) {
                $table->string('price')->nullable();
            });
        }
    }
};
