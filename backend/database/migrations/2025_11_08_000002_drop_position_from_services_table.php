<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Drop the `position` column from `services` if it exists.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'position')) {
                $table->dropColumn('position');
            }
        });
    }

    /**
     * Reverse the migrations.
     * We don't recreate the column with original values.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            if (! Schema::hasColumn('services', 'position')) {
                $table->integer('position')->nullable()->after('features');
            }
        });
    }
};
