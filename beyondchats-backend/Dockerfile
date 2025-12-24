# FROM php:8.2-apache

# # Enable Apache rewrite
# RUN a2enmod rewrite

# # Install only system tools (NO php-ext install)
# RUN apt-get update && apt-get install -y \
#     git \
#     unzip \
#     curl \
#     && rm -rf /var/lib/apt/lists/*

# # Install Composer
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# # Set Laravel document root
# ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
#     /etc/apache2/sites-available/*.conf \
#     && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
#     /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# # Set working directory
# WORKDIR /var/www/html

# # Copy app
# COPY . .

# # Install dependencies
# RUN composer install --no-dev --optimize-autoloader --no-interaction

# # Permissions
# RUN chown -R www-data:www-data storage bootstrap/cache

# # Expose Render port
# EXPOSE 10000

# # Start Apache
# CMD ["apache2-foreground"]


 FROM php:8.2-apache

# Enable Apache rewrite
RUN a2enmod rewrite

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions (CRITICAL - Laravel needs these)
RUN docker-php-ext-install \
    pdo \
    pdo_sqlite \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    bcmath \
    gd \
    opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set Laravel document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set working directory
WORKDIR /var/www/html

# Copy composer files first (for better caching)
COPY composer.json composer.lock ./

# Install dependencies (this will now work)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy the rest of the application
COPY . .

# Run composer scripts after copying all files
RUN composer dump-autoload --optimize

# Create SQLite database file if it doesn't exist
RUN mkdir -p database && \
    touch database/database.sqlite && \
    chmod 664 database/database.sqlite

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 storage bootstrap/cache database

# Run Laravel optimizations
RUN php artisan config:cache || true && \
    php artisan route:cache || true && \
    php artisan view:cache || true

# Expose Render port
EXPOSE 10000

# Start Apache
CMD ["apache2-foreground"]