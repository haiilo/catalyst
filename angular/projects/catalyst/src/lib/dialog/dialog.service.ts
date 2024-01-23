import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Configuration options for modal dialogs.
 */
export type CatDialogConfig<D = unknown> = Pick<
  DialogConfig<D>,
  'data' | 'disableClose' | 'height' | 'role' | 'width' | 'panelClass'
>;

/**
 * A service for managing modal dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class CatDialogService {
  constructor(private readonly dialog: Dialog) {}

  /**
   * Opens a modal dialog containing the given component.
   *
   * @param component The component to render as dialog content.
   * @param config The dialog configuration.
   * @returns The return value of the dialog.
   */
  open<R = unknown, D = unknown>(
    component: ComponentType<unknown>,
    config?: CatDialogConfig<D>
  ): Observable<R | undefined> {
    const panelClass = config?.panelClass ?? [];
    return this.dialog.open<R, D>(component, {
      backdropClass: 'cat-backdrop',
      panelClass: ['cat-dialog-pane', ...(Array.isArray(panelClass) ? panelClass : [panelClass])],
      width: '600px',
      minWidth: 'clamp(240px, 100vw - 16px, 320px)',
      minHeight: 'clamp(144px, 100vh - 16px, 160px)',
      maxHeight: 'calc(100vh - 64px)',
      maxWidth: 'calc(100vw - 64px)',
      ...config
    }).closed;
  }

  /**
   * Closes all open dialogs.
   */
  closeAll(): void {
    this.dialog.closeAll();
  }
}
